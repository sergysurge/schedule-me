export interface CustomerAppointmentEvent {
    id?: number;
    contactName?: string;
    contactNumber?: string;
    description?: string;
    startTime?: any;
    endTime?: any;
    comment?: string;
    customerId?: number;
    employeeId?: number;
    companyId?: number;
    employee?: any;
    company?: any;
}