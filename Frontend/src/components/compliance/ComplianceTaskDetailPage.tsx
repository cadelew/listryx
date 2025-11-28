'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppLayout from '../layout/AppLayout';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { ChevronLeft, Upload, FileText, AlertTriangle, CheckCircle, Plus } from 'lucide-react';

export default function ComplianceTaskDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [notes, setNotes] = useState('');
  const [checklist, setChecklist] = useState([
    { id: 1, item: 'Obtain lead-based paint disclosure form', completed: true },
    { id: 2, item: 'Have seller complete and sign disclosure', completed: true },
    { id: 3, item: 'Provide disclosure pamphlet to buyer', completed: false },
    { id: 4, item: 'Obtain buyer acknowledgment signature', completed: false },
    { id: 5, item: 'File completed forms with listing documents', completed: false },
  ]);

  const task = {
    id: 1,
    title: 'Complete disclosure forms',
    listing: '123 Main Street, San Francisco, CA',
    dueDate: '2025-11-26',
    priority: 'high',
    status: 'pending',
    description: 'Complete all required disclosure forms for property built before 1978. This includes lead-based paint disclosures and seller property disclosure statements.',
    createdDate: '2025-11-15',
    assignedTo: 'John Doe',
  };

  const documents = [
    { id: 1, name: 'Lead Disclosure Form.pdf', uploadedDate: '2025-11-20', size: '245 KB' },
    { id: 2, name: 'Seller Disclosure Statement.pdf', uploadedDate: '2025-11-21', size: '512 KB' },
  ];

  const aiAlerts = [
    {
      type: 'warning',
      message: 'Property was built in 1975 - Lead-based paint disclosure is mandatory',
    },
    {
      type: 'info',
      message: 'Deadline approaching in 1 day - Consider expediting review process',
    },
  ];

  const toggleChecklistItem = (itemId: number) => {
    setChecklist(prev => prev.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    ));
  };

  const completeTask = () => {
    alert('Task marked as complete!');
    router.push('/compliance');
  };

  const completedItems = checklist.filter(item => item.completed).length;
  const progress = (completedItems / checklist.length) * 100;

  return (
    <AppLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push('/compliance')}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-gray-900">{task.title}</h1>
                <Badge variant="destructive">{task.priority}</Badge>
                <Badge variant="secondary">{task.status}</Badge>
              </div>
              <p className="text-gray-600">{task.listing}</p>
            </div>
          </div>
          <Button onClick={completeTask} className="gap-2">
            <CheckCircle className="w-4 h-4" />
            Complete Task
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Description */}
            <Card>
              <CardHeader>
                <CardTitle>Task Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{task.description}</p>
              </CardContent>
            </Card>

            {/* AI Alerts */}
            {aiAlerts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>AI Compliance Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {aiAlerts.map((alert, idx) => (
                    <div key={idx} className={`flex gap-3 p-4 rounded-lg ${
                      alert.type === 'warning' ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'
                    }`}>
                      <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${
                        alert.type === 'warning' ? 'text-orange-600' : 'text-blue-600'
                      }`} />
                      <p className={`text-sm ${
                        alert.type === 'warning' ? 'text-orange-800' : 'text-blue-800'
                      }`}>
                        {alert.message}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Checklist */}
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle>Checklist</CardTitle>
                <div className="text-sm text-gray-600">
                  {completedItems} of {checklist.length} complete
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() => toggleChecklistItem(item.id)}
                        className="mt-1"
                      />
                      <label className={`flex-1 cursor-pointer ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {item.item}
                      </label>
                      {item.completed && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  ))}
                </div>

                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Item
                </Button>
              </CardContent>
            </Card>

            {/* Supporting Documents */}
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle>Supporting Documents</CardTitle>
                <Button size="sm" variant="outline" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Upload
                </Button>
              </CardHeader>
              <CardContent>
                {documents.length > 0 ? (
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">
                            Uploaded {doc.uploadedDate} • {doc.size}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm">No documents uploaded yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Add notes about this compliance task..."
                />
                <Button size="sm">Save Note</Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Task Info */}
            <Card>
              <CardHeader>
                <CardTitle>Task Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <Badge variant="secondary">{task.status}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Priority</p>
                  <Badge variant="destructive">{task.priority}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Due Date</p>
                  <p className="text-sm text-gray-900">{task.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Created</p>
                  <p className="text-sm text-gray-900">{task.createdDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Assigned To</p>
                  <p className="text-sm text-gray-900">{task.assignedTo}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Document
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <FileText className="w-4 h-4" />
                  View Listing
                </Button>
                <Button variant="outline" className="w-full">
                  Reassign Task
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
