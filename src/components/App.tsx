import AppRouter from "@/routes/AppRouter";
import { Box } from "@mui/material";
import AlertsWrapper from "./alert/AlertsWrapper";
import Dialog from "./dialog/Dialog";

const App = () => {
    return <Box>
        <AlertsWrapper />
        <Dialog />
        <AppRouter />
    </Box>
}

export default App;