import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

const htmlParser = (htmlString) => {
    const cleanHtmlString = DOMPurify.sanitize(htmlString,
        { USE_PROFILES: { html: true } });
    const html = parse(cleanHtmlString);
    return html;
}

export {
    htmlParser
}