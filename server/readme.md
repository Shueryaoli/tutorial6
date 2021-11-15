
npm install 


#init mongodb  

node .\scripts\trymongo.js   createDB  

node .\scripts\trymongo.js   createMgCollection  

node .\scripts\trymongo.js  createCounterDB  

node .\scripts\trymongo.js  insertCounterToMg  



#Test adding function  

node .\scripts\trymongo.js   insertDataToMg  

node .\scripts\trymongo.js   queryDataFromMg  


#Test updating function  

node .\scripts\trymongo.js   updateDataToMg  

node .\scripts\trymongo.js   queryDataFromMg  


#Test deleting function  

node .\scripts\trymongo.js   deleteDataFromMg  

node .\scripts\trymongo.js   queryDataFromMg  


#start server  

npm run start  



#access api graphql  

http://localhost:5000/graphql
