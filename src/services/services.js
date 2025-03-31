
export const getUrlImage = async (object) => {
    try {
        console.log(object);
        const response = await fetch('http://localhost:5000/generate', {
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
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
}