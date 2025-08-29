# VIT Full Stack API Solution

Author: Vedant Singh Jadon

A REST API built for the VIT Full Stack Question Paper that processes input arrays and returns categorized data including numbers, alphabets, and special characters.

## 🚀 Features

- **POST /bfhl**: Main endpoint that processes input data
- **GET /bfhl**: Test endpoint returning operation code
- Input validation and error handling
- Categorizes data into:
  - Odd numbers
  - Even numbers  
  - Alphabets (converted to uppercase)
  - Special characters
  - Sum of all numbers
  - Concatenated alphabets in reverse order with alternating caps

## 📋 Requirements

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd vit-fullstack-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update personal details**
   Edit `server.js` and update the `USER_DETAILS` object with your information:
   ```javascript
   const USER_DETAILS = {
       full_name: "your_name", // Replace with your name in lowercase
       birth_date: "ddmmyyyy", // Your birth date
       email: "your.email@domain.com", // Your email
       roll_number: "YOUR123" // Your roll number
   };
   ```

4. **Run the server**
   ```bash
   # Production
   npm start
   
   # Development (with auto-restart)
   npm run dev
   ```

5. **Test the API**
   ```bash
   npm test
   ```

## 🌐 API Endpoints

### POST /bfhl
Processes input array and returns categorized data.

**Request:**
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### GET /bfhl
Returns operation code for testing.

**Response:**
```json
{
  "operation_code": 1,
  "user_id": "john_doe_17091999"
}
```

## 🚀 Deployment Options

### Option 1: Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Your API will be available at: `https://your-app.vercel.app/bfhl`

### Option 2: Railway
1. Connect your GitHub repo to Railway
2. Deploy automatically
3. Your API will be available at: `https://your-app.railway.app/bfhl`

### Option 3: Render
1. Connect your GitHub repo to Render
2. Choose "Web Service"
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Your API will be available at: `https://your-app.onrender.com/bfhl`

### Option 4: Heroku
1. Install Heroku CLI
2. Create app: `heroku create your-app-name`
3. Deploy: `git push heroku main`
4. Your API will be available at: `https://your-app-name.herokuapp.com/bfhl`

## 🧪 Testing Examples

The API handles three main test cases as specified in the question paper:

### Example A: Mixed Input
- Input: `["a","1","334","4","R", "$"]`
- Processes numbers, single alphabets, and special characters

### Example B: Complex Mixed Input  
- Input: `["2","a", "y", "4", "&", "-", "*", "5","92","b"]`
- Handles multiple special characters and mixed data types

### Example C: Alphabet Strings
- Input: `["A","ABcD","DOE"]`
- Processes multi-character alphabetic strings

## 📁 Project Structure

```
vit-fullstack-api/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── test.js           # Test file for API verification
├── README.md         # Documentation
└── .gitignore        # Git ignore rules
```

## 🔧 Key Features Implemented

1. **Input Validation**: Checks for valid array input
2. **Number Processing**: Separates odd/even numbers, calculates sum
3. **Alphabet Processing**: Converts to uppercase, handles multi-char strings
4. **Special Character Detection**: Identifies non-alphanumeric characters
5. **Concatenation Logic**: Reverse order with alternating caps
6. **Error Handling**: Graceful exception handling
7. **CORS Support**: Enables cross-origin requests

## 🎯 Submission Requirements Met

- ✅ POST method at `/bfhl` route
- ✅ Returns all 10 required fields
- ✅ User ID in correct format
- ✅ Numbers returned as strings
- ✅ Proper error handling
- ✅ 200 status code for successful requests
- ✅ Ready for deployment to any hosting provider

## 📝 Notes

- All numbers are returned as strings as per requirements
- The concatenation logic processes individual characters from all alphabetic inputs
- Special characters include any non-alphanumeric characters
- The API is CORS-enabled for frontend integration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
