import { ElNotification } from "element-plus";
export function showError(text) {
    ElNotification.error({
        title: "Error",
        message: text,
    });
}

export function showSuccess(text) {
    ElNotification.success({
        title: "Success",
        message: text,
    });
}
