export default function insert(element: any) {
    document.addEventListener("loaded", () => {
        document.head.append(element);
    })
}