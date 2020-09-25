# Domain

## Purpose 

This is a Clinic Scheduler Application.

## Assumptions

1. This application has **Users**.
2. All **Users** has **Roles**.
    1. One **User** has at least one **Role**.
    2. The existent **Roles** are:
        * DOCTOR
        * SCHEDULER
    3. An **User** can be **Administrator**, but this is not a **Role**.
3. A **Doctor** has an **Schedule**.
4. A **Scheduler** can create **Appointments** on a **Schedule**.
5. An **Appointment** has:
    1. Day
    2. Start Time
    3. Duration
    4. Patient