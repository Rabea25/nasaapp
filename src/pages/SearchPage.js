import React from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchPage() {
    const query = new URLSearchParams(useLocation().search).get("q");
    return (<div>
        <p>{query}</p>
    </div>)
}