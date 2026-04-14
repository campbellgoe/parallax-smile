export type ParallaxItem = {
    type: string;
    x: ()=>number;
    y: ()=>number;
    z: number;
        textOverride?: string;
    image: {
        src: string;
        alt: string;
        width: number;
        height: number;
        fill?: boolean;
    }
}