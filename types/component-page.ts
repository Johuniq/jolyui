export interface ComponentItem {
    id: number;
    title: string;
    component: React.ReactElement;
    fileName: string;
    fileExample?: string;
    dependencies?: string[];
}

export interface PageConfig {
    title: string;
    description: string;
    folder: string;
    components: ComponentItem[];
    viewType?: "block" | "grid";
    gridClassName?: string;
    componentClassName?: string;
}

export interface PageMetadata {
    title: string;
    description: string;
}
