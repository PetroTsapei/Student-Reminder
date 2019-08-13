import React, { useEffect } from 'react';

/**
 * @return {null}
 */
export default function Redirect({ history }) {
  console.log(history);

  useEffect(() => {
    const phone = new URLSearchParams(history.location.search).get('url');
    const id = new URLSearchParams(history.location.search).get('id');

    if (phone && id && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      window.location.replace(`${phone}&id=${id}`);
    }
    else window.close();

  }, []);

  return null
}