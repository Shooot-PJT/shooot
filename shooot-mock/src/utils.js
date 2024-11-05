export const checkProjectName = async (projectName) => {
    try {
        const response = await fetch(`https://shooot.co.kr/express/projects/search?projectName=${projectName}`);
        const data = await response.json();
        return data.canUse;
    } catch (error) {
        console.error("[checkProjectName Error]:", error);
        return "ERROR";
    }
};
