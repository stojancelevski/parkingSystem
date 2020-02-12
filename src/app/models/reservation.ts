export interface Reservation {
    key: string;
    userId: string;
    parkingId: string;
    startTime: string;
    endTime: string;
    parked: boolean;
}
