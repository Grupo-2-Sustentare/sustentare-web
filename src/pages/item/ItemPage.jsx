import React from 'react';
import { useParams } from 'react-router-dom';

export default function ItemPage() {
    const { item } = useParams();

    return (
        <div>
            <h1>Detalhes do Item</h1>
            <p>Você selecionou o item: {item}</p>
        </div>
    );
}