import "dotenv/config";
import "./models/Deal";
import "./models/User";
import "./db";
import app from "./server";



const PORT =4000;
const handleListening = () => {console.log(`๐Server Open : http://localhost:${PORT}`)};
app.listen(PORT , handleListening); //์๋ฒ๋ฅผ ์คํํ๋๋ถ๋ถ