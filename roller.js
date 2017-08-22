let roller = function(count, die, critRange, critMultipler, ac, dr, health, atk, recoil) {

    let output = [];
    let damage = 0;
    let hits = 0;
    let sub = atk;

    for (let i = 0; i < count; i++) {

        if (damage >= health) {
            output.push("<span class='dead'>Enemy dead! " + damage + " total.</span>");
            break;
        }

        if (i == 0) {
            sub = atk;
        } else {
            sub = recoil;
        }

        let roll = Math.floor(Math.random() * 20) + 1;
        let rollBase = roll;

        if (roll == 1) {

            output.push("<span class='fail'>Roll " + (i + 1) + ": CRITICAL FAIL! " + damage + " total.</span>");
            break;

        } else if (roll >= critRange) {

            output.push("<span class='crit1'>Roll " + (i + 1) + ": CRITICAL (" + roll + ")! Rolling to confirm...</span>");
            hits++;
            let roll2 = Math.floor(Math.random() * 20) + 1;
            let roll2Base = roll2;

            if (roll2 >= critRange) {

                output.push("<span class='crit2'>Roll " + (i + 1) + ": DOUBLE CRITICAL (" + roll2 + ")! Rolling to confirm...</span>");
                let roll3 = Math.floor(Math.random() * 20) + 1;

                if (roll3 >= critRange) {
                    output.push("<span class='crit3'>Roll " + (i + 1) + ": TRIPLE CRITICAL (" + roll3 + ")! INSTANT KILL!</span>");
                    break;
                }

                let rollDamage = Math.max(0, ((Math.floor(Math.random() * die) + 1) * critMultipler) - dr);
                damage += rollDamage;
                output.push("<span class='crit2'>Roll " + (i + 1) + ": CRITICAL CONFIRMED (" + roll2 + ")! " + rollDamage + " damage, " + damage + " total.</span>");
                continue;
            }

            roll2 += sub;

            if (roll2 >= ac) {

                let rollDamage = Math.max(0, ((Math.floor(Math.random() * die) + 1) * critMultipler) - dr);
                damage += rollDamage;
                output.push("<span class='crit1'>Roll " + (i + 1) + ": CRITICAL CONFIRMED (" + roll2Base + " + " + sub + " = " + roll2 + ")! " + rollDamage + " damage, " + damage + " total.</span>");
                continue;

            } else {

                let rollDamage = Math.max(0, Math.floor(Math.random() * die) + 1 - dr);
                damage += rollDamage;
                output.push("<span class='crit1'>Roll " + (i + 1) + ": No critical (" + roll2Base + " + " + sub + " = " + roll2 + ")! " + rollDamage + " damage, " + damage + " total.</span> ");
                continue;

            }
        }

        roll += sub;

        if (roll >= ac) {

            let rollDamage = Math.max(0, Math.floor(Math.random() * die) + 1 - dr);
            damage += rollDamage;
            hits++;
            output.push("<span class='hit'>Roll " + (i + 1) + ": Hit (" + rollBase + " + " + sub + " = " + roll + "). " + rollDamage + " damage, " + damage + " total.</span>");

        } else {
            output.push("<span class='miss'>Roll " + (i + 1) + ": Miss (" + rollBase + " + " + sub + " = " + roll + ").</span>");
        }
    }

    output.push("Final stats: " + hits + " hits, " + damage + " damage, " + Math.max(0, health - damage) + " health left.");
    return output;
};