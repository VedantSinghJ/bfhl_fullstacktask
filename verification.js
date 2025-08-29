
function isAlphabet(char) {
    return /^[a-zA-Z]$/.test(char);
}

function isNumeric(char) {
    return /^[0-9]$/.test(char);
}

function isValidNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function processAlphabetsForConcat(data) {

    let allChars = [];
    
    for (let item of data) {
        const itemStr = String(item);
        for (let char of itemStr) {
            if (isAlphabet(char)) {
                allChars.push(char);
            }
        }
    }
   
    allChars.reverse();
    
    let result = '';
    for (let i = 0; i < allChars.length; i++) {
        if (i % 2 === 0) {
            result += allChars[i].toUpperCase();
        } else {
            result += allChars[i].toLowerCase();
        }
    }
    
    return result;
}

function processData(data) {
    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    
    for (let item of data) {
        const itemStr = String(item);
        
        // Check if it's a valid number
        if (isValidNumber(itemStr)) {
            const num = parseInt(itemStr);
            if (num % 2 === 0) {
                evenNumbers.push(itemStr);
            } else {
                oddNumbers.push(itemStr);
            }
            sum += num;
        }
        // Check if it contains only alphabetic characters
        else if (itemStr.split('').every(char => isAlphabet(char))) {
            alphabets.push(itemStr.toUpperCase());
        }
        // Check if it contains only special characters (no alphanumeric)
        else if (itemStr.split('').every(char => !isAlphabet(char) && !isNumeric(char))) {
            specialCharacters.push(itemStr);
        }
        // Mixed content - separate alphabets and special chars
        else {
            let alphabetPart = '';
            let specialPart = '';
            
            for (let char of itemStr) {
                if (isAlphabet(char)) {
                    alphabetPart += char;
                } else if (!isNumeric(char)) {
                    specialPart += char;
                }
            }
            
            if (alphabetPart) {
                alphabets.push(alphabetPart.toUpperCase());
            }
            if (specialPart) {
                specialCharacters.push(specialPart);
            }
        }
    }
    
    const concatString = processAlphabetsForConcat(data);
    
    return {
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        odd_numbers: oddNumbers,
        even_numbers: evenNumbers,
        alphabets: alphabets,
        special_characters: specialCharacters,
        sum: sum.toString(),
        concat_string: concatString
    };
}

const testCases = [
    {
        name: "Example A",
        input: ["a","1","334","4","R", "$"],
        expected: {
            odd_numbers: ["1"],
            even_numbers: ["334","4"],
            alphabets: ["A","R"],
            special_characters: ["$"],
            sum: "339",
            concat_string: "Ra"
        }
    },
    {
        name: "Example B", 
        input: ["2","a", "y", "4", "&", "-", "*", "5","92","b"],
        expected: {
            odd_numbers: ["5"],
            even_numbers: ["2","4","92"],
            alphabets: ["A", "Y", "B"],
            special_characters: ["&", "-", "*"],
            sum: "103",
            concat_string: "ByA"
        }
    },
    {
        name: "Example C",
        input: ["A","ABcD","DOE"],
        expected: {
            odd_numbers: [],
            even_numbers: [],
            alphabets: ["A","ABCD","DOE"],
            special_characters: [],
            sum: "0",
            concat_string: "EoDdCbAa"
        }
    }
];

function runVerification() {
    console.log("🧪 VERIFICATION TEST - Checking against question paper examples\n");
    
    testCases.forEach((testCase, index) => {
        console.log(`\n📋 ${testCase.name}`);
        console.log(`Input: ${JSON.stringify(testCase.input)}`);
        
        const result = processData(testCase.input);
        
        console.log("\n🔍 Results:");
        console.log(`Odd Numbers: ${JSON.stringify(result.odd_numbers)} ${JSON.stringify(result.odd_numbers) === JSON.stringify(testCase.expected.odd_numbers) ? '✅' : '❌'}`);
        console.log(`Even Numbers: ${JSON.stringify(result.even_numbers)} ${JSON.stringify(result.even_numbers) === JSON.stringify(testCase.expected.even_numbers) ? '✅' : '❌'}`);
        console.log(`Alphabets: ${JSON.stringify(result.alphabets)} ${JSON.stringify(result.alphabets) === JSON.stringify(testCase.expected.alphabets) ? '✅' : '❌'}`);
        console.log(`Special Chars: ${JSON.stringify(result.special_characters)} ${JSON.stringify(result.special_characters) === JSON.stringify(testCase.expected.special_characters) ? '✅' : '❌'}`);
        console.log(`Sum: "${result.sum}" ${result.sum === testCase.expected.sum ? '✅' : '❌'}`);
        console.log(`Concat String: "${result.concat_string}" ${result.concat_string === testCase.expected.concat_string ? '✅' : '❌'}`);
        
        if (result.concat_string !== testCase.expected.concat_string) {
            console.log(`\n🔍 Concat String Analysis for ${testCase.name}:`);
            console.log(`Expected: "${testCase.expected.concat_string}"`);
            console.log(`Got: "${result.concat_string}"`);
            
            // Debug the concatenation logic
            let allChars = [];
            for (let item of testCase.input) {
                const itemStr = String(item);
                for (let char of itemStr) {
                    if (isAlphabet(char)) {
                        allChars.push(char);
                    }
                }
            }
            console.log(`All alphabets extracted: [${allChars.join(', ')}]`);
            allChars.reverse();
            console.log(`Reversed: [${allChars.join(', ')}]`);
            
            let debugString = '';
            for (let i = 0; i < allChars.length; i++) {
                if (i % 2 === 0) {
                    debugString += allChars[i].toUpperCase();
                } else {
                    debugString += allChars[i].toLowerCase();
                }
                console.log(`Position ${i}: '${allChars[i]}' → ${i % 2 === 0 ? 'UPPER' : 'lower'} → '${debugString[i]}'`);
            }
            console.log(`Debug result: "${debugString}"`);
        }
        
        console.log("\n" + "=".repeat(60));
    });
}

runVerification();