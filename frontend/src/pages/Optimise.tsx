import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableHead, TableRow, TableCell, TableBody, TableHeader } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Trash2, 
  ScanLine, 
  PlusCircle, 
  BarChart4, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign,
  Search,
  X,
  Clock,
  Save
} from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Sample data
const dummyOptimizer = [
  { category: 'Coffee', suggestion: 'Brew at home 3x/week', saved: '₹360', impact: 'high' },
  { category: 'Snacks', suggestion: 'Buy in bulk instead of daily', saved: '₹210', impact: 'medium' },
  { category: 'Auto rides', suggestion: 'Use metro 2x/week', saved: '₹480', impact: 'high' },
  { category: 'Lunch', suggestion: 'Meal prep on weekends', saved: '₹550', impact: 'high' },
  { category: 'Groceries', suggestion: 'Shop with a list, avoid impulse buys', saved: '₹320', impact: 'medium' },
];

const dummySubscriptions = [
  { name: 'Spotify', amount: '₹119/mo', reason: 'Not used in 20 days', category: 'Entertainment' },
  { name: 'Disney+', amount: '₹149/mo', reason: 'Duplicate with Hotstar', category: 'Entertainment' },
  { name: 'Headspace', amount: '₹99/mo', reason: 'Better free alternatives', category: 'Wellness' },
  { name: 'Canva Pro', amount: '₹499/mo', reason: 'Limited usage (2x/month)', category: 'Productivity' },
];

const dummyInsights = [
  { title: 'Monthly Savings', value: '₹1,640', trend: 'up', percent: '23%' },
  { title: 'Redundant Services', value: '4', trend: 'down', percent: '2' },
  { title: 'Optimization Score', value: '82/100', trend: 'up', percent: '7%' },
];

export default function Optimize() {
  const [subscriptions, setSubscriptions] = useState(dummySubscriptions);
  const [optimizer, setOptimizer] = useState(dummyOptimizer);
  const [insights, setInsights] = useState(dummyInsights);
  const [showAddTip, setShowAddTip] = useState(false);
  const [showAddSubscription, setShowAddSubscription] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [tipFormData, setTipFormData] = useState({ category: '', suggestion: '', saved: '' });
  const [subFormData, setSubFormData] = useState({ name: '', amount: '', reason: '', category: '' });
  const [showNotification, setShowNotification] = useState(false);
  
  // Handle removing a subscription
  const handleRemove = (name) => {
    setSubscriptions((prev) => prev.filter((s) => s.name !== name));
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };
  
  // Add a new optimization tip
  const handleAddTip = (e) => {
    e.preventDefault();
    const newTip = { ...tipFormData, impact: 'medium' };
    setOptimizer(prev => [...prev, newTip]);
    setTipFormData({ category: '', suggestion: '', saved: '' });
    setShowAddTip(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };
  
  // Add a new subscription
  const handleAddSubscription = (e) => {
    e.preventDefault();
    setSubscriptions(prev => [...prev, subFormData]);
    setSubFormData({ name: '', amount: '', reason: '', category: '' });
    setShowAddSubscription(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };
  
  // Filter subscriptions by category
  const filteredSubscriptions = categoryFilter === 'All' 
    ? subscriptions 
    : subscriptions.filter(sub => sub.category === categoryFilter);
  
  // Generate categories for filter
  const categories = ['All', ...new Set(subscriptions.map(sub => sub.category))];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-white px-4 lg:px-8 py-8 space-y-6">
      {/* Header with dashboard summary */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <DollarSign className="h-8 w-8 mr-2 text-emerald-400" />
            Finance Optimizer
          </h1>
          <p className="text-gray-400">Smart insights to optimize your spending habits</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-700 hover:bg-gray-800 hover:text-white">
            <Clock className="h-4 w-4 mr-2" /> Last 30 Days
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-500">
            <Save className="h-4 w-4 mr-2" /> Export Report
          </Button>
        </div>
      </div>
      
      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {insights.map((insight, i) => (
          <Card key={i} className="bg-zinc-900 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <p className="text-gray-400">{insight.title}</p>
                {insight.trend === 'up' ? (
                  <Badge className="bg-green-600/20 text-green-400 hover:bg-green-600/30">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> {insight.percent}
                  </Badge>
                ) : (
                  <Badge className="bg-red-600/20 text-red-400 hover:bg-red-600/30">
                    <ArrowDownRight className="h-3 w-3 mr-1" /> {insight.percent}
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold mt-2">{insight.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Main tabs */}
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="bg-zinc-800/50 w-full rounded-xl mb-6 p-1">
          <TabsTrigger value="daily" className="rounded-lg">Daily Optimizer</TabsTrigger>
          <TabsTrigger value="services" className="rounded-lg">Subscription Audit</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg">Settings</TabsTrigger>
        </TabsList>
        
        {/* Daily Purchase Optimizer Tab */}
        <TabsContent value="daily">
          <div className="grid gap-6">
            <Card className="bg-zinc-900 border-gray-800">
              <CardHeader className="flex flex-row justify-between items-center pb-2">
                <div>
                  <CardTitle>Smart Daily Tips</CardTitle>
                  <CardDescription>Optimize your everyday spending habits</CardDescription>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-500" onClick={() => setShowAddTip(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Tip
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {optimizer.map((tip, idx) => (
                    <Card key={idx} className="bg-zinc-800 border-gray-700 overflow-hidden">
                      <div className="flex justify-between items-start p-4">
                        <div>
                          <h3 className="text-lg font-semibold">{tip.category}</h3>
                          <p className="text-sm text-gray-400 mt-1">{tip.suggestion}</p>
                        </div>
                        <Badge 
                          className={`${
                            tip.impact === 'high' ? 'bg-green-600/80' : 
                            tip.impact === 'medium' ? 'bg-yellow-600/80' : 'bg-blue-600/80'
                          } text-white`}
                        >
                          Save {tip.saved}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-900 border-gray-800">
              <CardHeader>
                <CardTitle>Spending Breakdown</CardTitle>
                <CardDescription>Your top spending categories</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-64">
                <BarChart4 className="h-24 w-24 text-gray-600 mb-4" />
                <p className="text-gray-400">Connect your bank accounts to see detailed spending analytics</p>
                <Button className="mt-4 bg-zinc-800 hover:bg-zinc-700 text-white">
                  Connect Accounts
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Subscription Audit Tab */}
        <TabsContent value="services">
          <Card className="bg-zinc-900 border-gray-800">
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <div>
                <CardTitle>Subscription Audit</CardTitle>
                <CardDescription>Review and optimize your recurring payments</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="border-gray-700 hover:bg-gray-800 hover:text-white"
                  onClick={() => setShowAddSubscription(true)}
                >
                  <PlusCircle className="h-4 w-4 mr-2" /> Add
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-500">
                  <ScanLine className="h-4 w-4 mr-2" /> Scan Accounts
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40 bg-zinc-800 border-gray-700">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-gray-700">
                    {categories.map((cat, i) => (
                      <SelectItem key={i} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="relative ml-auto max-w-sm">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search subscriptions..."
                    className="pl-8 bg-zinc-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              
              <div className="rounded-md border border-gray-800 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-zinc-800 bg-zinc-800/50 border-gray-800">
                      <TableHead className="text-gray-400">Name</TableHead>
                      <TableHead className="text-gray-400">Amount</TableHead>
                      <TableHead className="text-gray-400">Category</TableHead>
                      <TableHead className="text-gray-400">Flagged Reason</TableHead>
                      <TableHead className="text-gray-400 text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubscriptions.length > 0 ? (
                      filteredSubscriptions.map((s, i) => (
                        <TableRow key={i} className="hover:bg-zinc-800 border-gray-800">
                          <TableCell className="font-medium text-white">{s.name}</TableCell>
                          <TableCell className="text-white">{s.amount}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-gray-700 text-gray-300">
                              {s.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-400">{s.reason}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRemove(s.name)}
                              className="bg-red-900/30 hover:bg-red-800 text-red-400"
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Cancel
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                          No subscriptions found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-4 flex justify-between text-sm text-gray-400">
                <div>Showing {filteredSubscriptions.length} of {subscriptions.length} subscriptions</div>
                <div>Total monthly cost: <span className="font-bold text-white">₹866</span></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card className="bg-zinc-900 border-gray-800">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive spending insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekly-report" className="font-medium">Weekly Report</Label>
                  <p className="text-sm text-gray-400">Receive a weekly summary of your spending patterns</p>
                </div>
                <Switch id="weekly-report" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="threshold-alert" className="font-medium">Threshold Alerts</Label>
                  <p className="text-sm text-gray-400">Get notified when spending exceeds your budget</p>
                </div>
                <Switch id="threshold-alert" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sub-renewal" className="font-medium">Subscription Renewal Alerts</Label>
                  <p className="text-sm text-gray-400">Be notified before subscriptions renew</p>
                </div>
                <Switch id="sub-renewal" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="spending-insights" className="font-medium">AI Spending Insights</Label>
                  <p className="text-sm text-gray-400">Get personalized suggestions based on your spending</p>
                </div>
                <Switch id="spending-insights" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900 border-gray-800 mt-6">
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Manage your linked financial accounts</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-48">
              <p className="text-gray-400">No accounts connected yet</p>
              <Button className="mt-4 bg-zinc-800 hover:bg-zinc-700 text-white">
                Connect Bank Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Tip Dialog */}
      <Dialog open={showAddTip} onOpenChange={setShowAddTip}>
        <DialogContent className="bg-zinc-900 border-gray-700">
          <DialogTitle className="text-white">Add a New Tip</DialogTitle>
          <form onSubmit={handleAddTip} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="tip-category">Category</Label>
              <Input 
                id="tip-category"
                placeholder="e.g. Coffee, Transportation" 
                className="bg-zinc-800 border-gray-700 text-white"
                value={tipFormData.category}
                onChange={(e) => setTipFormData({...tipFormData, category: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="tip-suggestion">Suggestion</Label>
              <Input 
                id="tip-suggestion"
                placeholder="Your money-saving tip" 
                className="bg-zinc-800 border-gray-700 text-white"
                value={tipFormData.suggestion}
                onChange={(e) => setTipFormData({...tipFormData, suggestion: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="tip-saved">Estimated Savings</Label>
              <Input 
                id="tip-saved"
                placeholder="e.g. ₹200" 
                className="bg-zinc-800 border-gray-700 text-white"
                value={tipFormData.saved}
                onChange={(e) => setTipFormData({...tipFormData, saved: e.target.value})}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-500 w-full">Add Tip</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Add Subscription Dialog */}
      <Dialog open={showAddSubscription} onOpenChange={setShowAddSubscription}>
        <DialogContent className="bg-zinc-900 border-gray-700">
          <DialogTitle className="text-white">Add a Subscription</DialogTitle>
          <form onSubmit={handleAddSubscription} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="sub-name">Service Name</Label>
              <Input 
                id="sub-name"
                placeholder="e.g. Netflix" 
                className="bg-zinc-800 border-gray-700 text-white"
                value={subFormData.name}
                onChange={(e) => setSubFormData({...subFormData, name: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="sub-amount">Monthly Amount</Label>
              <Input 
                id="sub-amount"
                placeholder="e.g. ₹199/mo" 
                className="bg-zinc-800 border-gray-700 text-white"
                value={subFormData.amount}
                onChange={(e) => setSubFormData({...subFormData, amount: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="sub-category">Category</Label>
              <Select 
                value={subFormData.category} 
                onValueChange={(value) => setSubFormData({...subFormData, category: value})}
              >
                <SelectTrigger id="sub-category" className="bg-zinc-800 border-gray-700">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-gray-700">
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Productivity">Productivity</SelectItem>
                  <SelectItem value="Wellness">Wellness</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sub-reason">Flag Reason (Optional)</Label>
              <Input 
                id="sub-reason"
                placeholder="Why should this be reviewed?" 
                className="bg-zinc-800 border-gray-700 text-white"
                value={subFormData.reason}
                onChange={(e) => setSubFormData({...subFormData, reason: e.target.value})}
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-500 w-full">Add Subscription</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Notification toast */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 bg-green-900/90 text-white p-4 rounded-lg shadow-xl flex items-center gap-2 animate-in fade-in">
          <div className="bg-green-800 p-2 rounded-full">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5L6.5 10.5L4 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span>Update successful!</span>
          <button onClick={() => setShowNotification(false)} className="ml-2 text-gray-300 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}