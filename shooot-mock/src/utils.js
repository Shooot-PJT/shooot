require("dotenv").config();

export const checkProjectName = async (projectName) => {
    try {
        const response = await fetch(`${process.env.EXPRESS_BASE_URL}/projects/search?projectName=${projectName}`);
        const data = await response.json();
        return data.canUse;
    } catch (error) {
        console.error("[checkProjectName Error]:", error);
        return "ERROR";
    }
};
