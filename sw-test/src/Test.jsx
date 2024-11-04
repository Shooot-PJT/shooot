import { useEffect } from "react";
import shooot from "shooot";

export const Test = () => {
    useEffect(() => {
        shooot.setConfigs({
            projectName: "test",
            delay: 500,
        });
    }, []);

    return <div>hello</div>;
};
