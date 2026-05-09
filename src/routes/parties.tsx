import { createFileRoute } from '@tanstack/react-router';
import { Parties } from '../components/Parties/Parties';

export const Route = createFileRoute('/parties')({
  component: Parties,
});
