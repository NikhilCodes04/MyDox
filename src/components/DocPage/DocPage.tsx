// import { Input, Paper } from '@mui/material';

// export default function DocPage() {
//     return (
//         <div 
//         style={{ display: 'flex', justifyContent: 'center',}}
//         >
//             <Paper className='doc' sx={{ width: '595px' ,height:'892px'}}>
//                 <Input
//                     multiline
//                     disableUnderline
//                     sx={{
//                         margin: '20px', // Adjust the margin value as needed
//                         width: '90%', // Set the width to 100% to fill the available space
//                         // height: '100%', // Set the height to 100% to fill the available space
//                         maxHeight:'100%',
//                         // resize: 'none', // Disable textarea resizing
//                         // overflow: 'hidden', // Hide overflowing content
//                         // textAlign: 'start',
//                     }}
//                 />
//             </Paper>
//         </div>
//     );
// }

import { useState, ChangeEvent } from 'react';
import { Input, Paper } from '@mui/material';

const MAX_LINES_PER_PAGE = 36;


function DocPage({ onChange, value }: { onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void, value: string }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Paper className='doc' sx={{ width: '595px', height: '892px' }}>
                <Input
                    multiline
                    disableUnderline
                    onChange={onChange}
                    value={value}
                    sx={{
                        margin: '20px',
                        width: '90%',
                        maxHeight: '100%',
                        overflowY: 'hidden', // Hide overflowing content
                    }}
                />
            </Paper>
        </div>
    );
}

export default function Document() {
    const [pages, setPages] = useState<string[]>(['']);

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = event.target.value;
        const lines = inputText.split('\n');
        const totalChars = lines.reduce((acc, line) => acc + line.length, 0);

        const totalPagesNeeded = Math.ceil(lines.length / MAX_LINES_PER_PAGE) || 1;
        const charsPerPage = Math.ceil(totalChars / totalPagesNeeded);

        const newPages: string[] = [];
        let currentPage = '';
        let currentChars = 0;

        lines.forEach((line) => {
            if (line.length + currentChars <= charsPerPage) {
                // Add the line to the current page
                currentPage += line + '\n';
                currentChars += line.length;
            } else {
                // Start a new page
                newPages.push(currentPage);
                currentPage = line + '\n';
                currentChars = line.length;
            }
        });

        // Add the last page
        newPages.push(currentPage);

        setPages(newPages);
    };

    return (
        <>
            {pages.map((page, index) => (
                <DocPage
                    key={index}
                    value={page}
                    onChange={handleInputChange}
                />
            ))}
        </>
    );
}
