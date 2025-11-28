'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppLayout from '../layout/AppLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ChevronLeft, CheckCircle, Edit, Trash2, Calendar } from 'lucide-react';

export default function TaskDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState('');

  const [task, setTask] = useState({
    id: 1,
    title: 'Schedule property showing',
    description: 'Arrange viewing for 123 Main St with John Smith',
    listing: '123 Main Street',
    listingId: '1',
    client: 'John Smith',
    clientId: '1',
    dueDate: '2025-11-26',
    priority: 'high',
    status: 'pending',
    createdDate: '2025-11-20',
    assignedTo: 'Jane Doe',
  });

  const comments = [
    { id: 1, author: 'Jane Doe', text: 'Client prefers afternoon showings', date: '2025-11-22', time: '3:45 PM' },
    { id: 2, author: 'Mike Wilson', text: 'Property is available starting next week', date: '2025-11-21', time: '10:20 AM' },
  ];

  const completeTask = () => {
    setTask({ ...task, status: 'complete' });
    alert('Task marked as complete!');
  };

  const deleteTask = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      router.push('/tasks');
    }
  };

  const addComment = () => {
    if (comment.trim()) {
      alert('Comment added!');
      setComment('');
    }
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push('/tasks')}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-gray-900">{task.title}</h1>
                <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'secondary' : 'default'}>
                  {task.priority}
                </Badge>
                <Badge variant={task.status === 'complete' ? 'default' : 'secondary'}>
                  {task.status}
                </Badge>
              </div>
              <p className="text-gray-600">Task Details</p>
            </div>
          </div>
          <div className="flex gap-2">
            {task.status === 'pending' && (
              <Button onClick={completeTask} className="gap-2">
                <CheckCircle className="w-4 h-4" />
                Complete Task
              </Button>
            )}
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="gap-2">
              <Edit className="w-4 h-4" />
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Details */}
            <Card>
              <CardHeader>
                <CardTitle>Task Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Priority</Label>
                        <Select value={task.priority} onValueChange={(value) => setTask({ ...task, priority: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Due Date</Label>
                        <Input
                          type="date"
                          value={task.dueDate}
                          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Description</p>
                      <p className="text-gray-900">{task.description}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Comments */}
            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {comments.length > 0 ? (
                  <div className="space-y-4">
                    {comments.map((c) => (
                      <div key={c.id} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm">{c.author}</p>
                          <p className="text-xs text-gray-500">{c.date} at {c.time}</p>
                        </div>
                        <p className="text-sm text-gray-700">{c.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No comments yet</p>
                )}

                <div className="space-y-3 pt-4 border-t">
                  <Label>Add Comment</Label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    placeholder="Write a comment..."
                  />
                  <Button onClick={addComment} disabled={!comment.trim()}>
                    Add Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Task Info */}
            <Card>
              <CardHeader>
                <CardTitle>Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <Badge variant={task.status === 'complete' ? 'default' : 'secondary'}>
                    {task.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Priority</p>
                  <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'}>
                    {task.priority}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Due Date</p>
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <Calendar className="w-4 h-4" />
                    {task.dueDate}
                  </div>
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

            {/* Linked Items */}
            <Card>
              <CardHeader>
                <CardTitle>Linked Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Listing</p>
                  <p className="text-sm text-gray-900">{task.listing}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Client</p>
                  <p className="text-sm text-gray-900">{task.client}</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {task.status === 'pending' && (
                  <Button onClick={completeTask} className="w-full gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Complete Task
                  </Button>
                )}
                <Button variant="outline" className="w-full gap-2" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="w-4 h-4" />
                  Edit Task
                </Button>
                <Button variant="outline" className="w-full text-red-600 hover:text-red-700 gap-2" onClick={deleteTask}>
                  <Trash2 className="w-4 h-4" />
                  Delete Task
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
