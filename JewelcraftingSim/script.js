var MatCount = {};
var MatWeight = {};
var MatOrder = [];

var LoadSimDataToTable = function() {
    var table = document.createElement("table");
    
    for(var i = 0; i < JCSimData.rows.length; i++) {
        LoadSimDataRow(JCSimData.rows[i], table, i);
    }
    
    DisplayTotalMats(table);
    document.body.append(table);
};

var LoadSimDataRow = function(row, table, num) {
    var tr = document.createElement("tr");
    
    var skillCol = document.createElement("td");
    
    if(num) {
        skillCol.innerHTML = "<p class='SkillCol'>" + (num * 5) + "</p>";
    }
    else {
        skillCol.innerHTML = "<p class='SkillCol'>1</p>";
    }
    
    tr.append(skillCol);
    
    SaveMatCount(row.col_main, num * 5);
    
    LoadSimDataCol([row.col_main], tr);
    LoadSimDataCol([row.col_b], tr);
    LoadSimDataCol([row.col_c], tr);
    LoadSimDataCol(row.col_i, tr);
    
    table.append(tr);
};

var LoadSimDataCol = function(colData, row) {
    var td = document.createElement("td");
    var bodyDiv;
    
    for(var i = 0; i < colData.length; i++) {
        bodyDiv = document.createElement("div");
        bodyDiv.innerHTML = GenRecipeText(colData[i]);
        td.append(bodyDiv);
    }
    
    row.append(td);
};

var GenRecipeText = function(recipe) {
    var materialText = "";
    
    for(var i = 0; i < recipe.mats.length; i++) {
        if(i) {
            materialText += "\n";
        }
        
        materialText += recipe.mats[i].num + "x [" + recipe.mats[i].name + "] -- Weight -> " + recipe.mats[i].weight;
    }
    
    var recipeTitle = "<p class='RecipeTitle' title='" + materialText + "'>[" + recipe.name + "]</p>";
    
    var recipeDifficulty = "<p class='RecipeDifficulty'>"
    recipeDifficulty += "<span class='Orange'>" + recipe.learn + "</span>";
    recipeDifficulty += "  <span class='Yellow'>" + recipe.yellow + "</span>";
    recipeDifficulty += "  <span class='Green'>" + recipe.green + "</span>";
    recipeDifficulty += "  <span class='Grey'>" + recipe.grey + "</span>";
    
    recipeDifficulty += "</p>";
    
    var recipeWeightText = "<p class='RecipeWeight'>";
    recipeWeightText += "W: " + recipe.weight.toFixed(2);
    recipeWeightText += " NIW: " + recipe.niw.toFixed(2);
    recipeWeightText += "</p>"
    
    return recipeWeightText + recipeTitle + recipeDifficulty;
};

var SaveMatCount = function(recipe, skill) {
    var mult = 5.0;
    
    if(recipe.green <= skill) {
        mult = 100.0;
    }
    else if(recipe.yellow <= skill) {
        mult = 15.0;
    }
    
    for(var i = 0; i < recipe.mats.length; i++) {
        if(!recipe.mats[i].num) {
            continue;
        }
        
        if(!MatCount[recipe.mats[i].name]) {
            MatCount[recipe.mats[i].name] = recipe.mats[i].num * mult;
            MatWeight[recipe.mats[i].name] = recipe.mats[i].weight * recipe.mats[i].num * mult;
            MatOrder.push(recipe.mats[i].name);
        }
        else {
            MatCount[recipe.mats[i].name] += recipe.mats[i].num * mult;
            MatWeight[recipe.mats[i].name] += recipe.mats[i].weight * recipe.mats[i].num * mult;
        }
    }
};

var DisplayTotalMats = function(table) {
    var tr = document.createElement("tr");
    var headerTd = document.createElement("td");
    var matTd = document.createElement("td");
    var weightTd = document.createElement("td");
    var par;
    
    headerTd.innerHTML = "<p class='SkillCol'>Totals</p>";
    tr.append(headerTd);
    
    var totalWeight = 0.0;
    
    for(var i = 0; i < MatOrder.length; i++) {
        par = document.createElement("p");
        par.innerHTML = "<span class='RecipeTitle'>[" + MatOrder[i] + "]</span> x" + MatCount[MatOrder[i]];
        
        par.title = "Weight/unit: " + (MatWeight[MatOrder[i]] / MatCount[MatOrder[i]]) + "\nTotal weight: " + MatWeight[MatOrder[i]];
        totalWeight += MatWeight[MatOrder[i]];
        
        matTd.append(par);
    }
    
    tr.append(matTd);
    
    weightTd.innerHTML = "<p>Total weight: " + totalWeight.toFixed(2) + "</p>";
    tr.append(weightTd);
    
    table.append(tr);
};

window.onload = function(e) {
    LoadSimDataToTable();
};