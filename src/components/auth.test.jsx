import {describe, expect, test} from 'vitest';
import {render} from "@testing-library/react";
import App from '../App';

describe('Pagina principal', () => {
    test('Deberia renderizarse', () => {
        render(<App/>);
        expect(screen.getByText('Rumba Cuba')).toBeInTheDocument()
    });
});