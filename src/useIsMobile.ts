import { useEffect, useState } from "react";

export default () => {
    const [mobile, setMobile] = useState(false)
    useEffect(() => {
        setMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
            .test(navigator.userAgent))
    })
    return mobile
}
