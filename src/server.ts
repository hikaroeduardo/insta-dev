import "dotenv/config";

import { app } from "./app";

const PORT = process.env.PORT_SERVER;

try {
    app.listen(PORT, () => {
        console.log(`Server is running in port ${PORT}`);
    });
} catch (err) {
    console.log(err);
}
