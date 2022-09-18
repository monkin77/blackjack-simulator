interface Result {
    message : string,
}

export const getTest = async () : Promise<Result | undefined> => {
    try {
        const res : Response = await fetch(`${process.env.REACT_APP_API_URL}/test`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        return await res.json();
    } catch (err) {
        console.log("Error in getTest service: ", err);
        return;
    }
};