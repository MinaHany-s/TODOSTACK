export const xssSanitize = (req, res, next) => {
    const sanitize = (obj) => {
        if (!obj || typeof obj !== 'object') return;

        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = obj[key]
                    .replace(/<[^>]*>?/gm, '')
                    .replace(/javascript:/gi, '')
                    .replace(/on\w+="[^"]*"/gi, '');
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                sanitize(obj[key]);
            }
        }
    };

    try {
        if (req.body) sanitize(req.body);    // ✅ تعديلات داخل الكائن
        if (req.query) sanitize(req.query);  // ✅ بدون استبدال req.query
        if (req.params) sanitize(req.params);
        next();
    } catch (err) {
        console.error("xssSanitize failed:", err.message);
        return res.status(500).json({ status: "error", message: "XSS sanitize failed" });
    }
};
