import { useCallback } from "react";
import alertify from "alertifyjs";

function useAlertify() {
     const success = useCallback((message) => {
          alertify.success(message);
     }, []);

     const error = useCallback((message) => {
          alertify.error(message);
     }, []);

     const confirm = useCallback((message, onOk, onCancel) => {
          alertify.confirm(message, onOk, onCancel);
     }, []);

     const notify = useCallback((message, type, wait = 5) => {
          alertify.notify(message, type, wait);
     }, []);

     return { success, error, confirm, notify };
}

export default useAlertify;
