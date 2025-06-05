// Utility functions for WhatsApp phone number formatting and validation

export class PhoneUtils {

    static getNumber(address: string): string {
        return address.split(" in ")[1]
    }

    /**
     * Format Indonesian phone number to international format
     * @param phone - Phone number in various formats
     * @returns Formatted phone number (62xxxxxxxxxx)
     */
    static formatIndonesianPhone(phone: string): string {
        // Remove all non-digit characters
        let cleaned = phone.replace(/\D/g, "")

        // Handle different formats
        if (cleaned.startsWith("0")) {
            // Convert 08xx to 628xx
            cleaned = "62" + cleaned.substring(1)
        } else if (cleaned.startsWith("8")) {
            // Convert 8xx to 628xx
            cleaned = "62" + cleaned
        } else if (cleaned.startsWith("+62")) {
            // Remove + from +62
            cleaned = cleaned.substring(1)
        } else if (!cleaned.startsWith("62")) {
            // Add 62 if not present
            cleaned = "62" + cleaned
        }

        return cleaned
    }

    /**
     * Validate Indonesian phone number
     * @param phone - Phone number to validate
     * @returns true if valid Indonesian phone number
     */
    static isValidIndonesianPhone(phone: string): boolean {
        const formatted = PhoneUtils.formatIndonesianPhone(phone)

        // Indonesian mobile numbers should be 12-13 digits starting with 62
        // Valid prefixes after 62: 8xx (where xx can be 11, 12, 13, 14, 15, 17, 18, 19, 21, 22, 31, 32, 33, 38, 52, 53, 55, 56, 57, 58, 59, 77, 78, 81, 82, 83, 85, 87, 88, 89, 95, 96, 97, 98, 99)
        const phoneRegex =
            /^62(8[1-9][0-9]{7,8}|21[0-9]{7,8}|22[0-9]{7,8}|31[0-9]{7,8}|32[0-9]{7,8}|33[0-9]{7,8}|38[0-9]{7,8}|52[0-9]{7,8}|53[0-9]{7,8}|55[0-9]{7,8}|56[0-9]{7,8}|57[0-9]{7,8}|58[0-9]{7,8}|59[0-9]{7,8}|77[0-9]{7,8}|78[0-9]{7,8}|81[0-9]{7,8}|82[0-9]{7,8}|83[0-9]{7,8}|85[0-9]{7,8}|87[0-9]{7,8}|88[0-9]{7,8}|89[0-9]{7,8}|95[0-9]{7,8}|96[0-9]{7,8}|97[0-9]{7,8}|98[0-9]{7,8}|99[0-9]{7,8})$/

        return phoneRegex.test(formatted)
    }

    /**
     * Extract phone number from WhatsApp JID
     * @param jid - WhatsApp JID (e.g., "6281234567890@s.whatsapp.net")
     * @returns Phone number
     */
    static extractPhoneFromJID(jid: string): string {
        return jid.split("@")[0]
    }

    /**
     * Convert phone number to WhatsApp JID
     * @param phone - Phone number
     * @param isGroup - Whether this is a group JID
     * @returns WhatsApp JID
     */
    static phoneToJID(phone: string, isGroup: boolean = false): string {
        const formatted = PhoneUtils.formatIndonesianPhone(phone)
        return isGroup ? `${formatted}@g.us` : `${formatted}@s.whatsapp.net`
    }

    /**
     * Format phone number for display
     * @param phone - Phone number
     * @returns Formatted phone number for display (+62 8xx-xxxx-xxxx)
     */
    static formatForDisplay(phone: string): string {
        const formatted = PhoneUtils.formatIndonesianPhone(phone)

        if (formatted.length >= 10) {
            // Format as +62 8xx-xxxx-xxxx
            const countryCode = formatted.substring(0, 2)
            const prefix = formatted.substring(2, 5)
            const middle = formatted.substring(5, 9)
            const end = formatted.substring(9)

            return `+${countryCode} ${prefix}-${middle}-${end}`
        }

        return `+${formatted}`
    }

    /**
     * Check if phone number is a valid WhatsApp admin
     * @param phone - Phone number to check
     * @param adminPhones - Array of admin phone numbers
     * @returns true if phone is admin
     */
    static isAdminPhone(phone: string, adminPhones: string[]): boolean {
        const formatted = PhoneUtils.formatIndonesianPhone(phone)

        return adminPhones.some((adminPhone) => {
            const formattedAdmin = PhoneUtils.formatIndonesianPhone(adminPhone)
            return formatted === formattedAdmin
        })
    }

    /**
     * Normalize phone number for comparison
     * @param phone - Phone number to normalize
     * @returns Normalized phone number
     */
    static normalize(phone: string): string {
        return PhoneUtils.formatIndonesianPhone(phone)
    }

    /**
     * Get phone number variants for matching
     * @param phone - Base phone number
     * @returns Array of possible phone number formats
     */
    static getVariants(phone: string): string[] {
        const base = PhoneUtils.formatIndonesianPhone(phone)
        const variants = [base]

        // Add variant with +
        variants.push(`+${base}`)

        // Add variant starting with 0 (for Indonesian format)
        if (base.startsWith("62")) {
            variants.push(`0${base.substring(2)}`)
        }

        // Add variant without country code
        if (base.startsWith("62")) {
            variants.push(base.substring(2))
        }

        return variants
    }
}
