var LoadSimDataToTable = function() {
    var table = document.createElement("table");
    
    for(var i = 0; i < JCSimData.rows.length; i++) {
        LoadSimDataRow(JCSimData.rows[i], table, i);
    }
    
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

window.onload = function(e) {
    LoadSimDataToTable();
};