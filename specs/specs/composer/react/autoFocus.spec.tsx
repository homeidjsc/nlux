import {AiChat} from '@nlux-dev/react/src';
import {render} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it} from 'vitest';
import {adapterBuilder} from '../../../utils/adapterBuilder';
import {AdapterController} from '../../../utils/adapters';
import {waitForRenderCycle} from '../../../utils/wait';

describe('<AiChat /> + composer + autoFocus', () => {
    let adapterController: AdapterController | undefined;

    beforeEach(() => {
        adapterController = adapterBuilder().withBatchText().create();
    });

    afterEach(() => {
        adapterController = undefined;
    });

    describe('When no autoFocus option is initially provided', () => {
        it('The textarea should be rendered without autoFocus', async () => {
            // Arrange
            const {container} = render(<AiChat adapter={adapterController!.adapter}/>);

            // Act
            const textArea: HTMLTextAreaElement = container.querySelector('.nlux-comp-composer > textarea')!;

            // Assert
            expect(textArea.autofocus).toBe(false);
        });

        describe('When autoFocus option is set to true after initial render', () => {
            it('The textarea should be auto-focused', async () => {
                // Arrange
                const {container, rerender} = render(<AiChat adapter={adapterController!.adapter}/>);

                // Act
                await waitForRenderCycle();
                const textArea1: HTMLTextAreaElement = container.querySelector('.nlux-comp-composer > textarea')!;

                // Assert
                expect(document.activeElement).not.toBe(textArea1);

                // Act
                rerender(<AiChat adapter={adapterController!.adapter} composerOptions={{autoFocus: true}}/>);
                const textArea2: HTMLTextAreaElement = container.querySelector('.nlux-comp-composer > textarea')!;
                await waitForRenderCycle();

                // Assert
                expect(document.activeElement).toBe(textArea2);
            });
        });
    });

    describe('When autoFocus option is initially set to true', () => {
        it('The textarea should be focused on render', async () => {
            // Arrange
            const {container} = render(
                <AiChat adapter={adapterController!.adapter} composerOptions={{autoFocus: true}}/>,
            );

            const textArea: HTMLTextAreaElement = container.querySelector('.nlux-comp-composer > textarea')!;

            // Assert
            // React doesn't render autofocus attribute but focuses the element — On initial render!
            expect(document.activeElement).toBe(textArea);
        });

        describe('When autoFocus option is set to false after initial render', () => {
            it('The textarea should be rendered without autoFocus', async () => {
                // Arrange
                const {container, rerender} = render(
                    <AiChat adapter={adapterController!.adapter} composerOptions={{autoFocus: true}}/>,
                );

                // Act
                rerender(<AiChat adapter={adapterController!.adapter} composerOptions={{autoFocus: false}}/>);
                const textArea: HTMLTextAreaElement = container.querySelector('.nlux-comp-composer > textarea')!;

                // Assert
                expect(textArea.autofocus).toBe(false);
            });
        });
    });
});
