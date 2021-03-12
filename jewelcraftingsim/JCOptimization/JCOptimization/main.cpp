#include <iostream>
#include <string>
#include <fstream>
#include <map>
#include <vector>
#include <algorithm>

#include "MaterialConst.h"
#include "RecipeCosts.h"


std::string GetDocJSON();
std::string WriteRecipe(Recipe rec, int level);

double CalcWeightForRecipe(Recipe rec, int incidental);
std::string GetItemName(ItemStack item);
void InitializeItemRecMap();
void InitializeRecipeCols();
void InitializeRecipeSingleCol(int it);

bool CompareWeights(std::tuple<int, double> a, std::tuple<int, double> b);
int IsClose(double a, double b);

double GetColorBalancedWeight(Recipe rec, double weight, int skill, double O, double Y, double G);

struct ItemRec {
    double weight;
    std::string name;
    int isIncedental = false;
};

std::map<std::tuple<int, int>, ItemRec> ItemRecMap;

struct RecipeColRec {
    int ColA;
    int ColB;
    int ColC;
    std::vector<int> Incedentals;
};

std::vector<RecipeColRec> RecipeColumns;

// Layout:
// Col A: Most efficient reliable W; O: 1, Y: 3, G: 20
// Col B: Most efficient W (non-Col A); O: 1, Y: 2, G: 10
// Col C: Most efficient W (non-Col A, B); O: 1, Y: 2, G: 10
// Col I: More efficient NIW than Col A W (non-Col A); O: 1, Y: 2, G: 10

int main() {
    std::fstream ofile("..\\..\\output.js", std::ios::trunc | std::ios::out | std::ios::binary);

    if(!ofile.is_open()) {
        std::cout << "Could not output file!\n";
        return 1;
    }

    std::string obuff = GetDocJSON();

    ofile.write(obuff.c_str(), obuff.length());
    ofile.close();

	return 0;
}

std::string GetDocJSON() {
    InitializeItemRecMap();
    InitializeRecipeCols();

    std::string ret = "var JCSimData = {";

    ret += "\"rows\":[";

    for(int i = 0; i < RecipeColumns.size(); i++) {
        if(i) {
            ret += ",";
        }

        ret += "{";

        ret += "\"col_main\":" + WriteRecipe(Recipe_Array[RecipeColumns[i].ColA], i * 5) + ",";

        if(RecipeColumns[i].ColB != -1) {
            ret += "\"col_b\":" + WriteRecipe(Recipe_Array[RecipeColumns[i].ColB], i * 5) + ",";
        }
        else {
            ret += "\"col_b\":null,";
        }

        if(RecipeColumns[i].ColC != -1) {
            ret += "\"col_c\":" + WriteRecipe(Recipe_Array[RecipeColumns[i].ColC], i * 5) + ",";
        }
        else {
            ret += "\"col_c\":null,";
        }

        ret += "\"col_i\":[";

        for(int j = 0; j < RecipeColumns[i].Incedentals.size(); j++) {
            if(j) {
                ret += ",";
            }

            ret += WriteRecipe(Recipe_Array[RecipeColumns[i].Incedentals[j]], i * 5);
        }

        ret += "]";
        ret += "}";
    }

    ret += "]";
    ret += "};";
    return ret;
}

std::string WriteRecipe(Recipe rec, int level) {
    std::string ret = "{";

    ret += "\"name\":\"" + std::string(rec.name) + "\",";
    ret += "\"learn\":" + std::to_string(rec.learn) + ",";
    ret += "\"yellow\":" + std::to_string(rec.yellow) + ",";
    ret += "\"green\":" + std::to_string(rec.green) + ",";
    ret += "\"grey\":" + std::to_string(rec.grey) + ",";

    ret += "\"weight\":" + std::to_string(GetColorBalancedWeight(rec, CalcWeightForRecipe(rec, true), level, 1.0, 2.0, 10.0)) + ",";
    ret += "\"niw\":" + std::to_string(GetColorBalancedWeight(rec, CalcWeightForRecipe(rec, false), level, 1.0, 2.0, 10.0)) + ",";

    ret += "\"mats\":[";

    for(int i = 0; i < rec.matCount; i++) {
        if(i) {
            ret += ",";
        }

        ret += "{";

        ret += "\"name\":\"" + GetItemName(rec.cost[i]) + "\",";
        ret += "\"num\":" + std::to_string(rec.cost[i].quantity) + ",";
        ret += "\"weight\":" + std::to_string(ItemRecMap[{(int)rec.cost[i].type, rec.cost[i].item}].weight);

        ret += "}";
    }

    ret += "]";

    ret += "}";
    return ret;
}

double CalcWeightForRecipe(Recipe rec, int incidental) {
    double weight = 0.0;
    ItemRec item;

    for(int i = 0; i < rec.matCount; i++) {
        item = ItemRecMap[{(int)rec.cost[i].type, rec.cost[i].item}];

        if(incidental || !item.isIncedental) {
            weight += item.weight * (double)rec.cost[i].quantity;
        }
    }

    return weight;
}

std::string GetItemName(ItemStack item) {
    return ItemRecMap[{(int)item.type, item.item}].name;
}

void InitializeItemRecMap() {
    int i;

    for(i = 0; i < n_ItemNames; i++) {
        ItemRecMap[{(int)ItemNames[i].type, ItemNames[i].item}].name = ItemNames[i].name;
    }

    double timeCost;

    for(i = 0; i < n_TimeCostOfMats; i++) {
        timeCost = (double)TimeCostOfMats[i].quantity;

        if(timeCost == 0) {
            ItemRecMap[{(int)TimeCostOfMats[i].type, TimeCostOfMats[i].item}].weight = 1e9 - 1.0;
        }
        else {
            ItemRecMap[{(int)TimeCostOfMats[i].type, TimeCostOfMats[i].item}].weight = 1000.0 / timeCost;
        }
    }

    for(i = 0; i < n_IncedentalsArray; i++) {
        ItemRecMap[{(int)IncedentalsArray[i].type, IncedentalsArray[i].item}].isIncedental = true;
    }
}

void InitializeRecipeCols() {
    for(int i = 0; i < 60; i++) { // [0-59], * 5 to make skill [0-295]
        InitializeRecipeSingleCol(i);
    }
}

void InitializeRecipeSingleCol(int it) {
    std::vector<std::tuple<int, double>> recipeOrderStrict;
    std::vector<std::tuple<int, double>> recipeOrderW;
    std::vector<std::tuple<int, double>> recipeOrderNIW;

    double tempW;
    double tempNIW;

    for(int i = 0; i < n_Recipe_Array; i++) {
        tempW = CalcWeightForRecipe(Recipe_Array[i], true);
        tempNIW = CalcWeightForRecipe(Recipe_Array[i], false);

        if((Recipe_Array[i].learn <= (it * 5)) || (Recipe_Array[i].learn == 1)) { // Available
            recipeOrderStrict.push_back({i, GetColorBalancedWeight(Recipe_Array[i], tempW, it * 5, 1.0, 3.0, 20.0)});
            recipeOrderW.push_back({i, GetColorBalancedWeight(Recipe_Array[i], tempW, it * 5, 1.0, 2.0, 10.0)});
            recipeOrderNIW.push_back({i, GetColorBalancedWeight(Recipe_Array[i], tempNIW, it * 5, 1.0, 2.0, 10.0)});
        }
    }

    std::sort(recipeOrderStrict.begin(), recipeOrderStrict.end(), CompareWeights);
    std::sort(recipeOrderW.begin(), recipeOrderW.end(), CompareWeights);
    std::sort(recipeOrderNIW.begin(), recipeOrderNIW.end(), CompareWeights);

    int colA;
    double weightA = 0.0;
    int colB = -1;
    int colC = -1;
    std::vector<int> colI;

    int tempCol;

    colA = std::get<0>(recipeOrderStrict[0]);
    weightA = GetColorBalancedWeight(Recipe_Array[colA], CalcWeightForRecipe(Recipe_Array[colA], true), it * 5, 1.0, 2.0, 10.0);

    for(int i = 0; i < recipeOrderW.size(); i++) {
        tempCol = std::get<0>(recipeOrderW[i]);

        if(colB == -1) {
            if(tempCol != colA) {
                colB = tempCol;
            }
        }
        else if(colC == -1) {
            if((tempCol != colA) && (tempCol != colB)) {
                colC = tempCol;
            }
        }
        else {
            break;
        }
    }

    for(int i = 0; i < recipeOrderNIW.size(); i++) {
        tempCol = std::get<0>(recipeOrderNIW[i]);
        tempNIW = std::get<1>(recipeOrderNIW[i]);

        if(tempNIW >= weightA) {
            break;
        }

        if(tempCol != colA) {
            colI.push_back(tempCol);
        }
    }

    RecipeColumns.push_back({
        colA,
        colB,
        colC,
        colI
    });
}

bool CompareWeights(std::tuple<int, double> a, std::tuple<int, double> b) {
    if(IsClose(std::get<1>(a), std::get<1>(b))) {
        return std::get<0>(a) < std::get<0>(b);
    }

    return std::get<1>(a) < std::get<1>(b);
}

int IsClose(double a, double b) {
    return abs(a - b) < 0.001;
}

double GetColorBalancedWeight(Recipe rec, double weight, int skill, double O, double Y, double G) {
    if(rec.yellow > skill) { // orange for range
        return weight * O;
    }
    else if(rec.green > skill) { // yellow for range
        return weight * Y;
    }
    else if(rec.grey > skill) { // green for range
        return weight * G;
    }

    return 1e9;
}