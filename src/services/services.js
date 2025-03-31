
export const getUrlImage = async (object) => {
    try {
        console.log(object);
        const response = await fetch('https://imagegenerator-cskt.onrender.com/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
        const data = await response.json();
        if(!response.ok || data.error){
            throw new Error(data.error);
        }
        console.log("aqui", data);
        return data;
    } catch (error) {
        throw error;
    }
}