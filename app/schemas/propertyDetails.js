/**
 * Created by waqas.bhatti on 15/03/2018.
 */
import { schema } from 'normalizr'

const landlord = new schema.Entity('landlords')

const contact = new schema.Entity('contacts', {
    landlord
})
const inspectionTime = new schema.Entity('inspectionTimes')

const property = new schema.Entity('properties', {
    contact: contact,
    inspection_times: [inspectionTime],
});

export default property