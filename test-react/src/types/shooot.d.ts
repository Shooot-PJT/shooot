declare module "shooot" {
    interface Configs {
        projectName: string;
        delay?: number;
    }

    interface Shooot extends Configs {
        setConfigs: (projectName: string, delay?: number) => Promise<void>;
        register: () => Promise<void>;
        unregister: () => Promise<void>;
    }

    const sw: Shooot;
    export default sw;
}
