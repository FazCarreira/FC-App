import { Button } from "@mui/material";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const PDF = ({ rootElementId, downloadFileName, ...rest }) => {

    const downloadPdfDocument = async () => {
        const input = rootElementId.map(id => document.getElementById(id));
        const canvas = [];

        for (let i = 0; i < input.length; i++) {
            const inp = input[i];
            canvas.push(await html2canvas(inp));
        }

        const pdf = new jsPDF('p', 'px', [842, 595]);
        canvas.map((c, i) => {
            if (i !== 0) pdf.addPage([842, 595], 'p');
            const imgData = c?.toDataURL('image/png');
            pdf.addImage(imgData, 'JPEG', 0, 0, 842, 595);

        })
        pdf.save(`${downloadFileName}.pdf`);
    }

    return <Button {...rest} onClick={downloadPdfDocument}>Download Pdf</Button>

}

export default PDF;