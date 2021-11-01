const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function sendFile(name, image) {
    return await supabase
        .storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(name, image);
}

async function deleteFile(name) {
    return await supabase
        .storage
        .from(process.env.SUPABASE_BUCKET)
        .remove([name])
}

function fullURL(name) {
    return supabase
        .storage
        .from(process.env.SUPABASE_BUCKET)
        .getPublicUrl(name)
}

module.exports = { sendFile, deleteFile, fullURL };
