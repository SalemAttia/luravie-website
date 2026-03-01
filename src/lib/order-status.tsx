import React from 'react';
import { Package, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';

interface StatusStyle {
    icon: React.ReactNode;
    colorClass: string;
}

export const ORDER_STATUS_CONFIG: Record<string, StatusStyle> = {
    pending: { icon: <Clock size={16} />, colorClass: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
    processing: { icon: <Package size={16} />, colorClass: 'text-blue-600 bg-blue-50 border-blue-200' },
    'on-hold': { icon: <Clock size={16} />, colorClass: 'text-orange-600 bg-orange-50 border-orange-200' },
    completed: { icon: <CheckCircle2 size={16} />, colorClass: 'text-green-600 bg-green-50 border-green-200' },
    cancelled: { icon: <AlertCircle size={16} />, colorClass: 'text-red-600 bg-red-50 border-red-200' },
    refunded: { icon: <AlertCircle size={16} />, colorClass: 'text-gray-600 bg-gray-50 border-gray-200' },
    failed: { icon: <AlertCircle size={16} />, colorClass: 'text-red-600 bg-red-50 border-red-200' },
    shipped: { icon: <Truck size={16} />, colorClass: 'text-teal bg-teal/5 border-teal/20' },
};

export function getStatusConfig(status: string): StatusStyle {
    return ORDER_STATUS_CONFIG[status] || ORDER_STATUS_CONFIG.processing;
}
