import { API_URL } from "data/constants";

export const changeStatus = (id: string | number, prevStatus: number, token: string, success?: any) => {
    const newStatus = prevStatus === 0 ? 1 : 0
    try {
        fetch(
            `${API_URL}/vendor/manufacturers/status/${id}`,
            {
                method: 'put',
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    "status": newStatus
                })
            }
        ).then((res) => res.json())
            .then(() => { success && success() });
    }
    catch (err) {
        console.error(err);
    }
}