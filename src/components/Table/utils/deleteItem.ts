import { API_URL } from "data/constants";

export const deleteItem = (id: string | number, token: string, success: any) => {

    try {
        fetch(
            `${API_URL}/vendor/manufacturers/${id}`,
            {
                method: 'delete',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then((res) => res.json())
            .then(() => success());
    }
    catch (err) {
        console.error(err);
    }

};