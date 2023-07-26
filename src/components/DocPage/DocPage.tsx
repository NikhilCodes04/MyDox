import { Input, Paper } from '@mui/material';

export default function DocPage() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center',}}>
            <Paper className='doc' sx={{ width: '595px' ,height:'892px'}}>
                <Input
                    multiline
                    disableUnderline
                    sx={{
                        margin: '10px', // Adjust the margin value as needed
                        width: '90%', // Set the width to 100% to fill the available space
                        height: '100%', // Set the height to 100% to fill the available space
                        resize: 'none', // Disable textarea resizing
                        overflow: 'hidden', // Hide overflowing content
                        textAlign: 'start',
                    }}
                />
            </Paper>
        </div>
    );
}
