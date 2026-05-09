import { createFileRoute } from '@tanstack/react-router';
import { Creatures } from '../components/Creatures/Creatures';

export const Route = createFileRoute('/$encounterId')({
  component: Creatures,
});
