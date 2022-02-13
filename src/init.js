import "dotenv/config";
import "./models/Deal";
import "./models/User";
import "./db";
import app from "./server";



const PORT =4000;
const handleListening = () => {console.log(`🆅Server Open : http://localhost:${PORT}`)};
app.listen(PORT , handleListening); //서버를 실행하는부분