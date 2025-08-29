const request = require('http');

// Test cases
const testCases = [
    {
        name: "Example A",
        data: ["a","1","334","4","R", "$"]
    },
    {
        name: "Example B", 
        data: ["2","a", "y", "4", "&", "-", "*", "5","92","b"]
    },
    {
        name: "Example C",
        data: ["A","ABcD","DOE"]
    }
];

//  POST request
function makeRequest(data, callback) {
    const postData = JSON.stringify({ data });
    
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/bfhl',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };
    
    const req = request.request(options, (res) => {
        let responseBody = '';
        
        res.on('data', (chunk) => {
            responseBody += chunk;
        });
        
        res.on('end', () => {
            callback(null, {
                statusCode: res.statusCode,
                body: JSON.parse(responseBody)
            });
        });
    });
    
    req.on('error', (err) => {
        callback(err);
    });
    
    req.write(postData);
    req.end();
}

// tests
async function runTests() {
    console.log('🧪 Running API Tests...\n');
    
    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        console.log(`Testing ${testCase.name}:`);
        console.log(`Input: ${JSON.stringify(testCase.data)}`);
        
        try {
            await new Promise((resolve, reject) => {
                makeRequest(testCase.data, (err, response) => {
                    if (err) {
                        console.log(`❌ Error: ${err.message}`);
                        reject(err);
                        return;
                    }
                    
                    console.log(`✅ Status Code: ${response.statusCode}`);
                    console.log(`📋 Response:`);
                    console.log(JSON.stringify(response.body, null, 2));
                    console.log('\n' + '='.repeat(50) + '\n');
                    resolve();
                });
            });
        } catch (error) {
            console.log(`❌ Test failed: ${error.message}\n`);
        }
    }
    
    console.log('🎉 Test execution completed!');
}

// Check if server is running
console.log('🚀 Starting API tests...');
console.log('📡 Make sure your server is running on port 3000');
console.log('   Run: npm start or node server.js\n');

setTimeout(() => {
    runTests();
}, 1000);