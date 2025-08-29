// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// personal details
const USER_DETAILS = {
    full_name: "vedant_singh_jadon", 
    birth_date: "10082004", 
    email: "vedant.jadon10@gmail.com",
    roll_number: "22BDS0101" 
};

// Helper function to check if a character is alphabetic
function isAlphabet(char) {
    return /^[a-zA-Z]$/.test(char);
}

// Helper function to check if a character is numeric
function isNumeric(char) {
    return /^[0-9]$/.test(char);
}

// Helper function to check if a string represents a valid number
function isValidNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

// Helper function to process alphabets for concatenation
function processAlphabetsForConcat(alphabets) {
    
    let allChars = [];
    alphabets.forEach(item => {
        for (let char of item) {
            if (isAlphabet(char)) {
                allChars.push(char.toLowerCase());
            }
        }
    });
    
    allChars.reverse();
    
    // Applying alternating caps (odd positions uppercase, even positions lowercase)
    let result = '';
    for (let i = 0; i < allChars.length; i++) {
        if (i % 2 === 0) {
            result += allChars[i].toLowerCase();
        } else {
            result += allChars[i].toUpperCase();
        }
    }
    
    return result;
}

// Main processing
function processData(data) {
    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    
    for (let item of data) {
        const itemStr = String(item);
        
        // valid number check
        if (isValidNumber(itemStr)) {
            const num = parseInt(itemStr);
            if (num % 2 === 0) {
                evenNumbers.push(itemStr);
            } else {
                oddNumbers.push(itemStr);
            }
            sum += num;
        }
        else if (itemStr.split('').every(char => isAlphabet(char))) {
            alphabets.push(itemStr.toUpperCase());
        }
        else if (itemStr.split('').every(char => !isAlphabet(char) && !isNumeric(char))) {
            specialCharacters.push(itemStr);
        }
        else {
            let hasAlpha = false;
            let hasSpecial = false;
            let alphaString = '';
            let specialString = '';
            
            for (let char of itemStr) {
                if (isAlphabet(char)) {
                    hasAlpha = true;
                    alphaString += char;
                } else if (!isNumeric(char)) {
                    hasSpecial = true;
                    specialString += char;
                }
            }
            
            if (hasAlpha && alphaString) {
                alphabets.push(alphaString.toUpperCase());
            }
            if (hasSpecial && specialString) {
                specialCharacters.push(specialString);
            }
        }
    }
    
    
    const concatString = processAlphabetsForConcat(alphabets);
    
    return {
        is_success: true,
        user_id: `${USER_DETAILS.full_name}_${USER_DETAILS.birth_date}`,
        email: USER_DETAILS.email,
        roll_number: USER_DETAILS.roll_number,
        odd_numbers: oddNumbers,
        even_numbers: evenNumbers,
        alphabets: alphabets,
        special_characters: specialCharacters,
        sum: sum.toString(),
        concat_string: concatString
    };
}

// POST route /bfhl
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        // input validation
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array"
            });
        }

        const result = processData(data);
        
        res.status(200).json(result);
        
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

// GET route /bfhl (for testing)
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1,
        user_id: `${USER_DETAILS.full_name}_${USER_DETAILS.birth_date}`
    });
});

// Health check route
app.get('/', (req, res) => {
    res.json({
        message: "VIT Full Stack API is running!",
        endpoints: {
            post: "/bfhl",
            get: "/bfhl"
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`POST endpoint: http://localhost:${PORT}/bfhl`);
});

module.exports = app;