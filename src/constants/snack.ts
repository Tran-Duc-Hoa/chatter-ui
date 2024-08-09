import { makeVar } from '@apollo/client';
import { SnackMessage } from 'src/interfaces/snack-message.interface';

export const snackVar = makeVar<SnackMessage | undefined>(undefined);
