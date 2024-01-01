export const generateCSS = (primary = "#010409",secondary = "#0d1117",tertiary = "#161b22",accent = "#e6edf3") => {
    return `:root:root {
        --bgColor-inset: ${primary} !important;
        --bgColor-default: ${secondary} !important;
        --bgColor-muted: ${tertiary} !important;
    }
    .octicon-mark-github {
        color: ${accent} !important;
    }
    .klBOTR {
        background-color: ${tertiary} !important;
    }
    .hSXtjz,
    .jMdYTc {
        background-color: ${secondary} !important;
    }`
}