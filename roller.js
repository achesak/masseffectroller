let roller = function(count, die, critRange, critMultipler, ac, dr, health) {
    let output = [];
    var damage = 0;
    for (let i = 0; i < count; i++) {
        let roll = Math.floor(Math.random() * 20) + 1;
        if (roll == 1) {
            output.push("Roll " + (i + 1) + ": CRITICAL FAIL! " + damage + " total.");
            break;
        } else if (roll >= critRange) {
            output.push("Roll " + (i + 1) + ": CRITICAL (" + roll + ")! Rolling to confirm...");
            let roll2 = Math.floor(Math.random() * 20) + 1;
            if (roll2 >= critRange) {
                output.push("Roll " + (i + 1) + ": DOUBLE CRITICAL (" + roll2 + ")! Rolling to confirm...");
                let roll3 = Math.floor(Math.random() * 20) + 1;
                if (roll3 >= critRange) {
                    output.push("Roll " + (i + 1) + ": TRIPLE CRITICAL (" + roll3 + ")! INSTANT KILL!");
                    break;
                } else {
                    let rollDamage = Math.max(0, ((Math.floor(Math.random() * die) + 1) * critMultipler) - dr);
                    damage += rollDamage;
                    output.push("Roll " + (i + 1) + ": CRITICAL CONFIRMED (" + roll3 + ")! " + rollDamage + " damage, " + damage + " total.");
                }
            } else if (roll2 >= ac) {
                let rollDamage = Math.max(0, ((Math.floor(Math.random() * die) + 1) * critMultipler) - dr);
                damage += rollDamage;
                output.push("Roll " + (i + 1) + ": CRITICAL CONFIRMED (" + roll2 + ")! " + rollDamage + " damage, " + damage + " total.");
            } else {
                let rollDamage = Math.max(0, Math.floor(Math.random() * die) + 1 - dr);
                damage += rollDamage;
                output.push("Roll " + (i + 1) + ": No critical (" + roll2 + ")! " + rollDamage + " damage, " + damage + " total.");
            }
        } else if (roll >= ac) {
            let rollDamage = Math.max(0, Math.floor(Math.random() * die) + 1 - dr);
            damage += rollDamage;
            output.push("Roll " + (i + 1) + ": Hit (" + roll + "). " + rollDamage + " damage, " + damage + " total.");
        } else {
            output.push("Roll " + (i + 1) + ": Miss (" + roll + ").");
        }
        if (damage >= health) {
            output.push("Enemy dead! " + damage + " total.");
            break;
        }
    }
    return [output, damage];
};