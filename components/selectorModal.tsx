import { ColorwayCSS } from "../utils";
import { generateCSS } from "./css";
export const SelectorModalBody = ({ colorways }: { colorways: any[] }) => {
    async function useEffect() {
        const colorway = await ColorwayCSS.get();
        if(colorway.name) {
            document.getElementById("ColorSelectorModal-body--" + colorway.name)!.classList.add("ColorSelectorModal-color--active");
        }
    }
    useEffect();
    return (
        <div class="ColorSelectorModal-body">
            {colorways.map((color) => {
                const colors = color.colors || [
                    "accent",
                    "primary",
                    "secondary",
                    "tertiary",
                ];
                return (
                    <div
                        class="ColorSelectorModal-color"
                        id={"ColorSelectorModal-body--" + color?.name}
                    >
                        <div
                            className="ColorSelectorModal-preview"
                            onClick={async () => {
                                document
                                .querySelectorAll(".ColorSelectorModal-color--active")
                                .forEach((elem) => 
                                    elem.classList.remove("ColorSelectorModal-color--active")
                                );
                                const colorway = await ColorwayCSS.get()
                                if (colorway.name === color.name) {
                                    ColorwayCSS.remove();
                                } else {
                                    document.getElementById("ColorSelectorModal-body--" + color.name)!.classList.add("ColorSelectorModal-color--active");
                                    ColorwayCSS.set(color.name,generateCSS(color.primary,color.secondary,color.tertiary,color.accent));
                                }
                            }}
                        >
                            {colors.map((colorItm: string | number) => {
                                return (
                                    <div
                                        className="ColorSelectorModal-previewColor"
                                        style={{backgroundColor: color[colorItm]}}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
