import { Box, Typography } from "@mui/material";
import PartyModeIcon from '@mui/icons-material/PartyMode';
import { FC } from "react";
import { TLogo } from "./types";

const Logo: FC<TLogo> = ({ fontSize, iconSize }) => {

    return <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ fontSize, fontWeight: 'bold', color: '#3c3c3c' }}>BL</Typography>
        <PartyModeIcon sx={{ fontSize: iconSize, color: '#3c3c3c' }} />
        <Typography sx={{ fontSize, fontWeight: 'bold', color: '#3c3c3c' }}>G</Typography>
    </Box>
}

export default Logo;